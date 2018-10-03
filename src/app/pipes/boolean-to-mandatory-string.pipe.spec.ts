import { BooleanToMandatoryStringPipe } from './boolean-to-mandatory-string.pipe';

describe('BooleanToMandatoryStringPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanToMandatoryStringPipe();
    expect(pipe).toBeTruthy();
  });
});
