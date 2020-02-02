import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepo: Repository<CatEntity>,
  ) {}

  async createCat(cat: CatEntity): Promise<CatEntity> {
    return this.catRepo.save(this.catRepo.create(cat));
  }

  async deleteCat(id: number): Promise<void> {
    await this.findOneById(id);
    this.catRepo.delete(id);
  }

  async updateCat(id: number, cat: CatEntity): Promise<void> {
    const existCat = await this.findOneById(id);
    // 当传入空数据时，避免覆盖原数据
    existCat.nickname = cat && cat.nickname ? cat.nickname : existCat.nickname;
    existCat.species = cat && cat.species ? cat.species : existCat.species;
    this.catRepo.save(existCat);
  }

  async findOneCat(id: number): Promise<CatEntity> {
    return this.findOneById(id);
  }

  async findCats(): Promise<CatEntity[]> {
    return this.catRepo.find();
  }

  private async findOneById(id: number) {
    const carInfo = this.catRepo.findOne(id);
    if (!carInfo) {
      throw new HttpException('找不到', HttpStatus.NOT_FOUND);
    }
    return carInfo;
  }
}
