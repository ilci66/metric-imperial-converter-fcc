const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test("Whole number", (done) => {
    let input = "12L"
    assert.equal(convertHandler.getNum(input), 12); 
    done()
  });
  test("Decimal number", (done) => {
    let input = "12.2L"
    assert.equal(convertHandler.getNum(input), 12.2); 
    done()
  });
  test("Fractional input", (done) => {
    let input = "12.2/2L"
    assert.equal(convertHandler.getNum(input), 6.1); 
    done()
  });
  test("Fractional input with a decimal", (done) => {
    let input = "12.2/6.1L"
    assert.equal(convertHandler.getNum(input), 2); 
    done()
  });
  test("Double fraction (error)", (done) => {
    let input = "3/3/2L"
    assert.equal(convertHandler.getNum(input), undefined); 
    done()
  });
  test("No numeric", (done) => {
    let input = "L"
    assert.equal(convertHandler.getNum(input), 1); 
    done()
  });
  test("Return each valid input unit", (done) => {
//forgot forEach could index, wasted some time writing it some other way
    let input = ["gal","l","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG",];
    let output = ["gal","L","mi","km","lbs","kg","gal","L","mi","km","lbs","kg",];
    input.forEach((unit,i)=>{
      assert.equal(convertHandler.getUnit(unit), output[i])
      }); 
    done()
  });
  test("invalid input unit", (done) => {
    let input = "12cakes"
    assert.equal(convertHandler.getUnit(input), undefined)
    done()
  });
  test("return unit for each valid input unit", (done) => {
    let input = ["gal", "l", "mi", "km", "lbs", "kg"];
    let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
    input.forEach((unit, i) => {
      assert.equal(convertHandler.getReturnUnit(unit), expect[i])
    });
    done()
  })
  test("spelled-out string unit for each valid input unit", (done) => {
    let input = ["gal", "l", "mi", "km", "lbs", "kg"];
    let expect = ["gallons","liters","miles","kilometers","pounds","kilograms",];
    input.forEach((unit,i) => {
      assert.equal(convertHandler.spellOutUnit(unit), expect[i])
    });
    done()
  })
//for this type of tests I'm gonna have to use approximately
//cause it's not the exact value
  test("Gal to L", (done) => {
    let input = [5, "gal"];
    let expected = 18.9271;
    assert.approximately(
      convertHandler.convert(input[0], input[1]), expected,0.1
    );
    //0.1 tolerance, necessary for approximately calculation
    done();
  });
    test("L to Gal", (done) => {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1
      );
      done();
    });

    test("Mi to Km", (done) => {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1
      );
      done();
    });

    test("Km to Mi", (done) => {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1
      );
      done();
    });

    test("Lbs to Kg", (done) => {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1
      );
      done();
    });

    test("Kg to Lbs", (done) => {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1
      );
      done();
    });
});