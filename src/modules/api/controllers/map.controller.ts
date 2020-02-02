import { Controller, Get } from '@nestjs/common';
import { MapService } from '../services/map.service';
import { map } from 'rxjs/operators';

@Controller()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('findAllApi')
  findAll() {
    return this.mapService.findAll().pipe(map(res => res.data));
  }
}
