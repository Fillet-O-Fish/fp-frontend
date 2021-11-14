import { Component } from '@angular/core';
import { TokenPriceService } from './token-price.service';
import { FormBuilder } from '@angular/forms';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fp-dashboard';
  addr = '0x72e570B7BC8470013F18b9c08940355fa1417863'
  url = "https://flowerpatch.app/polygon/render/flower-"
  seedContractAddress = "0x371b97c779e8c5197426215225de0eeac7dd13af";

  columns = ['token_id', 'name',
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
  constructor(private formBuilder: FormBuilder, private tokenPriceService: TokenPriceService) {
    this.getNFTs(this.addr)
  }


  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  seedPrice = 0.01;
  seedBalance = 0;
  seedValueInUsd = 0.0;
  // flower:any
  nftList: any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNFTs(this.addr)
  }
  getNFTs(walletAddr: String) {
    console.log("get NFTs:" + walletAddr)

    this.tokenPriceService.getFlowerList(walletAddr)
      .subscribe(res => {
        console.log(res)
        this.nftList = res
      })

  }

  getSeedTokenPrice() {

    this.tokenPriceService.getPrice(this.seedContractAddress)
      .subscribe(res => {
        console.log(res)
        this.seedPrice = res['price']
      })

  }


  getSeedBalance(walletAddr: String) {

    this.tokenPriceService.getSeedBalance(walletAddr)
      .subscribe(res => {
        console.log(res)
        this.seedBalance = res['result']
      })

  }

  onSubmit() {

    this.addr = this.checkoutForm.value.address
    this.checkoutForm.clearValidators()
    this.getSeedBalance(this.addr)
    this.getSeedTokenPrice()
    this.getNFTs(this.addr)
  }
}
