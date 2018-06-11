import {TestBed, inject} from '@angular/core/testing';

import {DemoService, MasterService} from './demo.service';

describe('DemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoService]
    });
  });

  it('should be created', inject([DemoService], (service: DemoService) => {
    expect(service).toBeTruthy();
  }));
});


// fakes
export class FakeValueService extends DemoService {
  value = 'faked service value';
}

describe('demo (no TestBed):', () => {
  describe('DemoService', () => {
    let service: DemoService;
    beforeEach(() => {
      service = new DemoService();
    });

    it('getValue should return real value', () => {
      expect(service.getValue()).toBe('real value');
    });

    it('getObservableValue should return value from observable', (done: DoneFn) => {
      service.getObservableValue().subscribe(value => {
        expect(value).toBe('observable value');
        done();
      });
    });

    it('getPromiseValue should return value from a promise', (done: DoneFn) => {
      service.getPromiseValue().then(value => {
        expect(value).toBe('promise value');
        done();
      });
    });
  });
});

// MasterService requires injection of a ValueService
describe('Master service without Angular testing support', () => {
  let masterService: MasterService;

  it('getValue should return real value from the real service', () => {
    masterService = new MasterService(new DemoService());
    expect(masterService.getValue()).toBe('real value');
  });

  it('getValue should return faked value from a fake service', () => {
    masterService = new MasterService(new FakeValueService());
    expect(masterService.getValue()).toBe('faked service value');
  });


  it('getValue should return faked value from fake object', () => {
    const fake = {getValue: () => 'fake value'};
    masterService = new MasterService(fake as DemoService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('getValue should return stubbed value from a spy', () => {
    // create `getValue` spy on an object representing the DemoService
    const demoServiceSpy = jasmine.createSpyObj('DemoService', ['getValue']);

    // set the value to return when the `getValue` spy is called
    const stubValue = 'stub value';
    demoServiceSpy.getValue.and.returnValue(stubValue);

    masterService = new MasterService(demoServiceSpy);

    expect(masterService.getValue()).toBe(stubValue, 'service returned stub value');
    expect(demoServiceSpy.getValue.calls.count()).toBe(1, 'spy method was called once');
    expect(demoServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
