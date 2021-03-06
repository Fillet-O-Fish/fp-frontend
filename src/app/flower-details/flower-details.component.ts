import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';
import { TokenPriceService } from '../token-price.service';
import { NgChartsModule } from 'ng2-charts';
import { Scale } from 'chart.js';
import { ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: '[app-flower-details]',
  templateUrl: './flower-details.component.html',
  styleUrls: ['./flower-details.component.css']
})
export class FlowerDetailsComponent implements OnInit {
  labelValues = [0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100];

  constructor(private tokenPriceService: TokenPriceService, private elementRef: ElementRef, private sanitizer: DomSanitizer) {
  }
  //  flower: any

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
    'midSeed']
  @Input() flower: any
  url = "https://flowerpatch.app/polygon/render/flower-"
  openseaUrl = "https://opensea.io/assets/matic/0xa115dfbb5ab7adffad2f7f25fa7a5c227616c2c3/"
  fDetails: any


  gradeList = ['E', 'D', 'C', 'B', 'A', 'S']
  hourRate = 0
  grade = 'E'
  seedDropValues: number[] = []
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0, // disables bezier curves
      }, point: {
        radius: 0
      }
    },
    showLines: false, // disable for all datasets
    animation: {
      duration: 0, // general animation time
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          min: 0,
          max: 10,
          stepSize: 1,
        }
      }, x: {
        min: 0,
        max: 100,
        ticks: {
          min: 0,
          max: 100,
          stepSize: 10
        }
      }

    },
  };
  barChartLabels = this.labelValues;
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    { data: this.seedDropValues, label: 'Series A' },

  ];
  hide: boolean = false;
  zero: boolean = false;

  unusual: string = 'rgb(103,193,113)'
  rare: string = 'rgb(25,153,207)'
  epic: string = 'rgb(255,119,211)'
  legendary: string = 'yellow'
  common: string = 'white'
  bgColor = "white"


  ngOnInit(): void {
    this.url = this.url + this.flower.token_id + ".png"
    this.openseaUrl = this.openseaUrl + this.flower.token_id
    // console.log("labelValues:" + this.labelValues)
    this.seedDropValues = this.graphSeedDrop(this.flower.harvestSpread, this.flower.harvestSize, this.flower.seedDrop, this.labelValues)
    this.getGrade(this.flower.avgSeed, this.flower.growthSpeed)
    this.bgColor = this.getColor(this.flower.rarityBracket)
    this.zero = this.flower.minSeed == 0
  }

  getColor(rarityBracket: String): string {
    switch (rarityBracket) {
      case "unusual":
        return this.unusual
      case "rare":
        return this.rare
      case "epic":
        return this.epic
      case "legendary":
        return this.legendary
    }
    return "white"
  }

  getGrade(avgSeed: any, growthSpeed: any) {
    var growthTime = 60 - (growthSpeed /2)
    console.log("growthTime: " + growthTime)
    this.hourRate = avgSeed * (60/growthTime)
    this.grade = this.gradeList[Math.floor(this.hourRate/6)]
    console.log("hourRate: " + this.hourRate)
    console.log("grade: " + this.grade)

  }


  toggleHide() {
    console.log("toggle hide")
    this.hide = !this.hide
  }

  makeArr(startValue: number, stopValue: number, cardinality: number) {
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      this.labelValues.push(startValue + (step * i));
    }

  }


  graphSeedDrop(harvest_spread: number, harvest_size: number, seed_drop: number, randNum: number[]): any {
    var harvestSpread = harvest_spread
    var harvestSize = harvest_size
    var seedDrop = seed_drop
    // console.log("randNum:" + randNum)

    var harvestSpreadFactor = harvestSpread / 20.0
    var multiplier = harvestSize / 20.0 + 1.0
    var ret = []
    for (let x = 0; x < randNum.length; x++) {
      var temp = 0
      temp = multiplier + ((randNum[x] / 100.0 * harvestSpreadFactor * 2.0) - harvestSpreadFactor)
      temp = Math.max(temp, 1)
      temp = Math.min(temp, 10)
      var seedAmt = Math.round(temp * seedDrop / 100.0)
      this.seedDropValues.push(seedAmt)
    }
    // console.log("ret:" + this.seedDropValues)
    // return ret
  }

}