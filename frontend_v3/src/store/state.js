import appStatus from '@/const/appstatus';

export default () => ({
  scatter: null,
  eos: null,
  user: null,
  status: {
    type: String,
    default: appStatus.LOGIN
  },
  error: '',
  loading: {
    type: Boolean,
    default: false
  },
  account: null,
  network: {
    blockchain: 'eos',
    protocol: process.env.PROTOCOL,
    host: process.env.HOST,
    port: process.env.PORT,
    chainId: process.env.CHAINID
  },
});
