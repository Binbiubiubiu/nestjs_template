import * as bcrypt from 'bcryptjs';

export const jwtConstants = {
  secret: 'secretKey',
  salt: bcrypt.genSaltSync(10),
};
