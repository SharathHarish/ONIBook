import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';


@Injectable()
export class AuthService {
constructor(private jwtService: JwtService, private prisma: PrismaService) {}


async validateUser(email: string, pass: string) {
const user = await this.prisma.user.findUnique({ where: { email } });
if (!user) return null;
const match = await bcrypt.compare(pass, user.password);
if (match) {
const { password, ...rest } = user as any;
return rest;
}
return null;
}


async login(user: { id: number; email: string; role: string }) {
const payload = { sub: user.id, email: user.email, role: user.role };
return { access_token: this.jwtService.sign(payload) };
}


async loginWithCredentials(email: string, password: string) {
const user = await this.prisma.user.findUnique({ where: { email } });
if (!user) throw new UnauthorizedException('Invalid credentials');
const ok = await bcrypt.compare(password, user.password);
if (!ok) throw new UnauthorizedException('Invalid credentials');
const { password: _p, ...payloadUser } = user as any;
return this.login(payloadUser);
}
}