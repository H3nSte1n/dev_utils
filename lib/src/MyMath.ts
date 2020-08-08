export class MyMath {

  /**
  * @Method: Returns the mean value of all transferred numbers
  * @static
  * @Param {Number series}
  * @Return {Mean value of all passed numbers}
  */
  public static mean(...numbers: number[]) {
    return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
  }
}