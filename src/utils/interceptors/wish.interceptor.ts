import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WishInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return;
        }

        if (Array.isArray(data)) {
          data.map((item) => {
            delete item.owner.email;
            delete item.owner.password;
          });
        } else {
          delete data.owner.email;
          delete data.owner.password;
        }

        return data;
      }),
    );
  }
}
