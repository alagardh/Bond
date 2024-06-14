/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import 'dotenv/config';
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { ASSET_MIGRATION } from 'src/utils/abi/AssetMigration'; 
import { Injectable } from '@nestjs/common';

let ethContract : any;
let web3 : any;

@Injectable()
export class EthereumInitialize {
     
  public async initiConnection(){
    const provider = new HDWalletProvider(
      process.env.MNEMONIC,
      process.env.API_KEY,
    );
  
    web3 = new Web3(provider);
  
    ethContract = new web3.eth.Contract(JSON.parse(ASSET_MIGRATION.abi), process.env.ETH_CONTRACT);

  }
}


