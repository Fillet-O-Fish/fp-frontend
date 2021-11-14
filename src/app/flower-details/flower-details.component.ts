import { Component, Input, OnInit } from '@angular/core';
import { TokenPriceService } from '../token-price.service';
@Component({
  selector: 'app-flower-details',
  templateUrl: './flower-details.component.html',
  styleUrls: ['./flower-details.component.css']
})
export class FlowerDetailsComponent implements OnInit {

  constructor(private tokenPriceService: TokenPriceService) {
  }
  //  flower: any

  columns = ['name',
    'rarityBracket',
    'mutability',
    'harvestSize',
    'harvestSpread',
    'seedDrop',
    'landAffinity',
    'maxSeed',
    'minSeed',
    'avgSeed',
    'midSeed']
  @Input() flower: any
  url = "https://flowerpatch.app/polygon/render/flower-"
  fDetails: any
  ngOnInit(): void {
    this.url = this.url + this.flower.token_id + ".png"
    // this.getFlowerDetail(this.nft.token_id)
  }

  // getFlowerDetail(id:String) {
  //   console.log(id)
  //   this.tokenPriceService.getFlowerDetails(id)
  //     .subscribe((res: any) => {
  //       console.log("res:" + res)
  //       res.url = this.url+ id + ".png"
  //       this.flower = res
  //     })

  // }
}
