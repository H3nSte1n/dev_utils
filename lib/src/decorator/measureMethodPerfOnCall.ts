import { performance } from 'perf_hooks';
import { MyMath } from '../MyMath';

/**
* @Method: Returns the average execution time of the selected method.
* @Param {int} count - Number of operations
* @return {any} - Result of the method
*/
export function measureMethodPerfOnCall(count: Number = 400): any {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    let result = descriptor.value();
    descriptor.value = function() {
      const resultArray: number[] = [];
      for (let i = 0; i < count; i += 1) {
        const start = performance.now();
        originalMethod.apply(this, arguments);
        const end = performance.now();
        resultArray.push(end - start);
      }
      console.log(`The average execution time is ${MyMath.mean(...resultArray)} seconds.`);
      return result;
    }
  };
}
