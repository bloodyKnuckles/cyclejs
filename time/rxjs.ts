import {Observable} from 'rxjs/Observable';
// tslint:disable-next-line:no-import-side-effect
import 'rxjs/add/observable/from';
import {setAdapt} from '@cycle/run/lib/adapt';

import {mockTimeSource as mockTimeSourceUntyped} from './lib/cjs/src/mock-time-source';
import {timeDriver as timeDriverUntyped} from './lib/cjs/src/time-driver';
import {Frame} from './lib/cjs/src/animation-frames';
import {Comparator, OperatorArgs} from './lib/cjs/src/types';

setAdapt(stream => Observable.from(stream));

type Operator = <T>(observable: Observable<T>) => Observable<T>;

interface TimeSource {
  createOperator<T>(): OperatorArgs<T>;
  animationFrames(): Observable<Frame>;
  delay(delayTime: number): Operator;
  debounce(period: number): Operator;
  throttle(period: number): Operator;
  periodic(period: number): Observable<number>;
  throttleAnimation: Operator;
  dispose(): void;
}

interface MockTimeSource extends TimeSource {
  diagram(str: string, values?: Object): Observable<any>;
  record(observable: Observable<any>): Observable<Array<any>>;
  assertEqual(
    actual: Observable<any>,
    expected: Observable<any>,
    comparator?: Comparator,
  ): void;
  run(cb?: (err?: Error) => void): void;
}

function mockTimeSource(args?: Object): MockTimeSource {
  return mockTimeSourceUntyped(args);
}

function timeDriver(sink: any): TimeSource {
  return timeDriverUntyped(sink);
}

export {Operator, TimeSource, timeDriver, MockTimeSource, mockTimeSource};
