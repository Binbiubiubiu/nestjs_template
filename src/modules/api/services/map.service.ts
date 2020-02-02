import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class MapService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<UserEntity[]>> {
    return this.httpService.get('http://localhost:3000/users/findAll');
  }
}
