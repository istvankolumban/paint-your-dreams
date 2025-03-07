import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderModalComponent } from './order-modal.component';

describe('OrderModalComponent', () => {
    let component: OrderModalComponent;
    let fixture: ComponentFixture<OrderModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderModalComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with correct modal content', () => {
        expect(component.orderNowModal.title).toBe('Rendelj most!');
        expect(component.orderNowModal.content).toContain('Ha szeretnéd megrendelni a könyvet');
        expect(component.orderNowModal.content).toContain('0740-519-728');
        expect(component.orderNowModal.content).toContain('kolumbanrita01@gmail.com');
    });

    describe('onCloseOrderModal', () => {
        beforeEach(() => {
            // Setup the modal element in the DOM
            const modalDiv = document.createElement('div');
            modalDiv.id = 'orderModal';
            modalDiv.style.display = 'block';
            document.body.appendChild(modalDiv);
        });

        afterEach(() => {
            // Cleanup
            const modal = document.getElementById('orderModal');
            if (modal && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });

        it('should set display to none when modal exists', () => {
            component.onCloseOrderModal();
            const modalElement = document.getElementById('orderModal');
            expect(modalElement?.style.display).toBe('none');
        });
    });
});