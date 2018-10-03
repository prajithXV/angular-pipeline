import {CoinPercentagePipe} from './coin-percentage-pipe.pipe';

describe('CoinPercentagePipePipe', () => {
  it('create an instance', () => {
    const pipe = new CoinPercentagePipe("EN");
    expect(pipe).toBeTruthy();
  });
});
