import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import crypto from 'crypto';

@Injectable()
export class RazorpayService {
  private razorpay: Razorpay;

  constructor(private configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET'),
    });
  }

  async createOrder(amount: number, currency: string = 'INR') {
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    try {
      return await this.razorpay.orders.create(options);
    } catch (error) {
      throw new Error(`Error creating Razorpay order: ${error.message}`);
    }
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string) {
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac(
        'sha256',
        this.configService.get<string>('RAZORPAY_KEY_SECRET'),
      )
      .update(body.toString())
      .digest('hex');
    return expectedSignature === signature;
  }
}
