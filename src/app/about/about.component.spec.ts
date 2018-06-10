import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AboutComponent} from './about.component';


describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let fixture: ComponentFixture<AboutComponent>;

describe('AboutComponent', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AboutComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .createComponent(AboutComponent);
    fixture.detectChanges();
  });
  it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });
  it('should have aqua <h3>', () => {
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const bgColor = h3.style.backgroundColor;
    expect(bgColor).toBe('aqua');
  });
});
