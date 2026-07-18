/** Verified against docs.arc.io on 2026-07-18. Re-verify before any transaction. */
export const arcTestnet = Object.freeze({
  id: 5042002,
  name: "Arc Testnet",
  rpcUrl: "https://rpc.testnet.arc.network",
  explorerUrl: "https://testnet.arcscan.app",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
  usdcErc20: { address: "0x3600000000000000000000000000000000000000", decimals: 6 }
});
