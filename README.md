# API

### Install

```sh
cd YOUR_WORKING_DIRECTORY/casperdash-api
npm install
```

### Usage

```sh
npm start     //mainnet
npm run dev   //testnet
```

#### Tokens/RPC configuration

The default ERC20 token, NFT(cep47) or node rpc addresses can be configurable at

```sh
YOUR_WORKING_DIRECTORY/casperdash-api/config/testnet
YOUR_WORKING_DIRECTORY/casperdash-api/config/mainet
```

##### Configuration sample

-   ERC20
    ```javascript
    // ERC20 token contract hash
    '6fe7d28174ae5946d1f805f38a7cb546842897b33f0220840f0638d156673e97';
    ```
-   NFT
    ```javascript
    // Contract hash is key
    '6cdf5a5e23eedb6b79cfe52d16fa07cbdece9516b13dde03e6c28b288d5c3a7c': {
    	name: 'CaskCollectibleToken', // token name
    	symbol: 'CTT', // token symbol
    	namedKeys: {
    		// all named keys that you want to get should be list
    		metadata: {
    			// metadata named key
    			attributes: [
    				// list attributes which you want to massage before return to client
    				{ key: 'bg', name: 'Background' },
    				{ key: 'description', name: 'Description' },
    				{ key: 'distillery', name: 'Distillery' },

    			],
    		},
    		commissions: {
    			attributes: [
    				{ key: 'mcask_account', name: 'Metacask Account' },
    				{ key: 'mcask_rate', name: 'Commission Rate' },
    			],
    		},
    	},
    },
    ```
-   RPC
    `javascript const RPC_CONFIG = [ { country: 'Singapore', ip: '134.209.110.11' }, { country: 'Singapore', ip: '68.183.226.35' }, ]; `

### Document

Check document at http://localhost:3001/api-docs after running

![](https://i.imgur.com/kaDjQfF.png)

### Workflow and contributions

https://github.com/CasperDash/casperdash-client/wiki/Development-Workflow

### License

[MIT](https://raw.githubusercontent.com/CasperDash/casperdash-api/master/LICENSE)
