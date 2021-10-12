function classifier(input) {​
    if (Array.isArray(input) === false) {​
        throw new TypeError('Input must be an array');
    }​
    if (input.length === 0) {​
        return {​ noOfGroups: 0 }​;
    }​

    const students = input.map(student => {​
        const age = calculateAge(student.dob);
        return {​ ...student, age }​;
    }​);

    students.sort((first, second) => first.age - second.age);
    let groupInfo = {​ noOfGroups: 1 }​

    for (let index = 0; index < students.length; index++) {
        const student = students[index];
        const currentGroupNumber = groupInfo.noOfGroups;
        const nextGroupNumber = currentGroupNumber + 1;
        const currentGroupName = `group${​currentGroupNumber}​`;
        const nextGroupName = `group${​nextGroupNumber}​`;
        const currentGroup = groupInfo[currentGroupName] || {​
          members: [],
          regNos: [],
          sum: 0,
        }​;
        const isOlder = currentGroup.members.some((existingMember) => {​
          return student.age - existingMember.age > 5;
        }​);
        if (isOlder || currentGroup.members.length >= 3) {​
            return {​
              ...groupInfo,
              [nextGroupName]: {​
                members: [student],
                regNos: [Number(student.regNo)],
                oldest: student.age,
                sum: student.age,
              }​,
              noOfGroups: nextGroupNumber,
            }​;
          }​
          groupInfo = {​
            ...groupInfo,
            [currentGroupName]: {​
              members: [...currentGroup.members, student],
              regNos: [...currentGroup.regNos, Number(student.regNo)].sort(
                (a, b) => a - b,
              ),
              oldest: student.age,
              sum: currentGroup.sum + student.age,
            }​,
          }​;
    }
    return groupInfo
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  }