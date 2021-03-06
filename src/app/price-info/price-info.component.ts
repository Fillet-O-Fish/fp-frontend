import { Component, Input, OnInit } from '@angular/core';
import { TokenPriceService } from '../token-price.service';
@Component({
  selector: 'app-price-info',
  templateUrl: './price-info.component.html',
  styleUrls: ['./price-info.component.css']
})
export class PriceInfoComponent implements OnInit {

  constructor(private tokenPriceService: TokenPriceService) { }
  seedContractAddress = "0x371b97c779e8c5197426215225de0eeac7dd13af";
  @Input() addr: any
  @Input() plantCount: any
  @Input() seedPrice : any
  @Input() seedBalance : any
  @Input() maxPerHarvest = 0
  @Input() minPerHarvest = 0
  @Input() midPerHarvest = 0
  @Input() avgPerHarvest = 0

  maxPerHarvestPrice = 0.0
  minPerHarvestPrice = 0.0
  midPerHarvestPrice = 0.0
  avgPerHarvestPrice = 0.0
  ngOnInit(): void {

  }

}
