import { OrderDTO } from './order.dto';
import { User } from './user.model';

export class OrderPaymentDTO {
    user: User;
    items: Array<OrderDTO>;
    billAmount : number;
}