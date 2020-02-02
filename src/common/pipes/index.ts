import { Provider, ValidationPipe } from '@nestjs/common';
import { GlobalPipeAdapter } from '../utils/provider.adapter';

const pipes = [new ValidationPipe()];

export const GlobalPipes: Provider[] = pipes.map(GlobalPipeAdapter);
