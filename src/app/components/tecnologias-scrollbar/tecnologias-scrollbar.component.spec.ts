import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiasScrollbarComponent } from './tecnologias-scrollbar.component';

describe('TecnologiasScrollbarComponent', () => {
  let component: TecnologiasScrollbarComponent;
  let fixture: ComponentFixture<TecnologiasScrollbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnologiasScrollbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnologiasScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
