/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
 function classifier(input) {
     if(input.length ==0) {
         return {"noOfGroups": 0}
     }
     let sorted = input.reduce((arr, item, index) => {
        item["age"] = new Date().getFullYear() - parseInt(item.dob)
        arr.push(item);
        return arr
    }, []).sort((a,b) => a.age - b.age)

       console.log(sorted);

    const array = [ [] ];
    for (let i = 0; i < sorted.length; i++) {
        let latestGroup = array[ array.length -  1];
        let currentStudent = sorted[i];

        if( latestGroup.length === 3){
            array.push( [currentStudent] );
        }
        //check for empty group
        else if( latestGroup.length === 0){
            latestGroup.push(currentStudent);
        } else {
            let lastStudent = latestGroup[ latestGroup.length - 1];
            //check the age difference
            if( currentStudent.age - lastStudent.age <= 5){
                latestGroup.push(currentStudent)
            } else {
                array.push([currentStudent])
            }
        }
    }
    return array.reduce((obj, arr, index, array) => {
        obj["noOfGroups"] = array.length;
        obj[`group${index+1}`] = {};
        obj[`group${index+1}`].members = arr
        let sum = 0;
        let max = Number.NEGATIVE_INFINITY;
        array[index].forEach(arr => sum += arr.age)
        array[index].forEach(arr => {
            if(arr.age > max) {
                max = arr.age;
                return max
            }
        })
        const reg = array[index].reduce((arr, val) => {
            arr.push(parseInt(val.regNo));
            let sorted = arr.sort((a,b) => a-b);
            return sorted
        }, [])
        obj[`group${index+1}`].sum = sum
        obj[`group${index+1}`].oldest = max
        obj[`group${index+1}`].regNos = reg
        return obj
    }, {}) 
  }

  console.log(classifier([
    {
      name: 'Hendrick',
      dob: '1853-07-18T00:00:00.000Z',
      regNo: '041',
    },
    {
      name: 'Albert',
      dob: '1879-03-14T00:00:00.000Z',
      regNo: '033',
    },
    {
      name: 'Marie',
      dob: '1867-11-07T00:00:00.000Z',
      regNo: '024',
    },
    {
      name: 'Neils',
      dob: '1885-10-07T00:00:00.000Z',
      regNo: '02',
    },
    {
      name: 'Max',
      dob: '1858-04-23T00:00:00.000Z',
      regNo: '014',
    },
    {
      name: 'Erwin',
      dob: '1887-08-12T00:00:00.000Z',
      regNo: '09',
    },
    {
      name: 'Auguste',
      dob: '1884-01-28T00:00:00.000Z',
      regNo: '08',
    },
    {
      name: 'Karl',
      dob: '1901-12-05T00:00:00.000Z',
      regNo: '120',
    },
    {
      name: 'Louis', //
      dob: '1892-08-15T00:00:00.000Z',
      regNo: '022',
    },
    {
      name: 'Arthur',
      dob: '1892-09-10T00:00:00.000Z',
      regNo: '321',
    },
    {
      name: 'Paul',
      dob: '1902-08-08T00:00:00.000Z',
      regNo: '055',
    },
    {
      name: 'William',
      dob: '1890-03-31T00:00:00.000Z',
      regNo: '013',
    },
    {
      name: 'Owen',
      dob: '1879-04-26T00:00:00.000Z',
      regNo: '052',
    },
    {
      name: 'Martin',
      dob: '1871-02-15T00:00:00.000Z',
      regNo: '063',
    },
    {
      name: 'Guye',
      dob: '1866-10-15T00:00:00.000Z',
      regNo: '084',
    },
    {
      name: 'Charles',
      dob: '1868-02-14T00:00:00.000Z',
      regNo: '091',
    },
  ]));

module.exports = classifier;
