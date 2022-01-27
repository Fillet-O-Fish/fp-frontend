import { Component } from '@angular/core';
import { TokenPriceService } from './token-price.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'fp-dashboard';
  addr = '0x72e570B7BC8470013F18b9c08940355fa1417863'
  //addr = '0x7523626db57503f3C3268D159E07f051a478aF33'
  url = "https://flowerpatch.app/polygon/render/flower-"
  seedContractAddress = "0x371b97c779e8c5197426215225de0eeac7dd13af";
  totalPlants = 0
  columns = ['token_id', 'name',
    'rarityBracket',
    'rarity',
    'mutability',
    'harvestSize',
    'harvestSpread',
    'seedDrop',
    'landAffinity',
    'maxSeed',
    'minSeed',
    'avgSeed',
    'midSeed', 'seedGraph']

  rarityList = [
    'common',
    'unusual',
    'rare',
    'epic',
    'legendary']

  maxPerHarvest = 0
  minPerHarvest = 0
  midPerHarvest = 0
  avgPerHarvest = 0

  maxPerHarvestPrice = 0.0
  minPerHarvestPrice = 0.0
  midPerHarvestPrice = 0.0
  avgPerHarvestPrice = 0.0
  zeroFlag = false
  filtered = false
  zeroCounts = 0;
  flatZeroCounts = 0;
  constructor(private formBuilder: FormBuilder,
    private tokenPriceService: TokenPriceService,
    private activatedRoute: ActivatedRoute,) {
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
  showList: any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
  }

  form = new FormGroup({  
    rarity: new FormControl('', Validators.required)  
  });  

  getNFTs(walletAddr: String) {
    console.log("get NFTs:" + walletAddr)

    this.tokenPriceService.getFlowerList(walletAddr)
      .subscribe(res => {
        console.log(res)



        this.nftList = res
        this.nftList.sort(function (a: any, b: any) {
          return Number(b.token_id) - Number(a.token_id)
        })
        // for (let i = 0; i < this.nftList.length; i++) {
        //   this.maxPerHarvest += this.nftList[i].maxSeed
        //   this.minPerHarvest += this.nftList[i].minSeed
        //   this.midPerHarvest += this.nftList[i].midSeed
        // }
        this.maxPerHarvest = this.nftList.reduce(function (acc: any, flower: any) {

          return acc + flower.maxSeed
        }, 0);
        this.minPerHarvest = this.nftList.reduce(function (acc: any, flower: any) {
          return acc + flower.minSeed
        }, 0);
        this.midPerHarvest = this.nftList.reduce(function (acc: any, flower: any) {
          return acc + flower.midSeed
        }, 0);
        this.avgPerHarvest = this.nftList.reduce(function (acc: any, flower: any) {
          return acc + flower.avgSeed
        }, 0);

        this.totalPlants = this.nftList.reduce(function (acc: any, flower: any) {
          return acc + 1
        }, 0);

        console.log("max: " + this.maxPerHarvest)
        console.log("min: " + this.minPerHarvest)
        console.log("mid: " + this.midPerHarvest)
        this.showList = this.nftList
      })

  }

  ngAfterViewInit() {
    this.getSeedBalance(this.addr)
    this.getSeedTokenPrice()

    this.getNFTs(this.addr)

  }

  showZero() {
    this.zeroFlag = !this.zeroFlag
    console.log(this.zeroFlag)
    if (!this.zeroFlag) {
      this.showList = this.nftList
    } else {
      this.showList = this.nftList.filter(function (flower: any) {
        return flower.minSeed == 0;
      });
      this.zeroCounts = this.showList.length
      this.flatZeroCounts = this.showList.filter(function (flower: any) {
        return flower.maxSeed == 0;
      }).reduce(function (acc: any, flower: any) {
        return acc + 1
      }, 0);
    }
  }

  rarityFilter() {
    this.filtered = true
    // if (!this.filtered) {
    //   this.showList = this.nftList
    // } else {
      this.showList = this.nftList.filter( (flower: any) => {
        console.log(this.form.value)
        return flower.rarityBracket == this.form.value.rarity;
      });
    // }
  }




  clear(){
    this.showList = this.nftList
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

