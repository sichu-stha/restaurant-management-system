import { OrderPayment } from './orderPayment.model';

export class PaymentLog {
    id?: number;
    orderPayment: OrderPayment;
    status: string;
    total: number;
}