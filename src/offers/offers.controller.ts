import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Offer } from './entities/offer.entity';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async createOffer(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.createOffer(req.user, createOfferDto);
  }

  @Get()
  findAllOffers(): Promise<Offer[]> {
    return this.offersService.findAllOffers();
  }

  @Get(':id')
  async findOfferById(@Param('id') id: number): Promise<Offer> {
    const offer = await this.offersService.findOfferById(id);
    if (!offer) {
      throw new NotFoundException('Не найдено');
    }
    return offer;
  }
}
