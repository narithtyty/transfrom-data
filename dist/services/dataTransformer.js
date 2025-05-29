"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTransformer = void 0;
class DataTransformer {
    transformUsersByDepartment(users) {
        if (!users || users.length === 0) {
            return {};
        }
        const departmentMap = new Map();
        for (const user of users) {
            const department = user.company?.department;
            if (!department)
                continue;
            let deptData = departmentMap.get(department);
            if (!deptData) {
                deptData = {
                    males: 0,
                    females: 0,
                    ages: [],
                    hairColors: new Map(),
                    addresses: new Map(),
                };
                departmentMap.set(department, deptData);
            }
            if (user.gender === "male") {
                deptData.males++;
            }
            else if (user.gender === "female") {
                deptData.females++;
            }
            if (user.age) {
                deptData.ages.push(user.age);
            }
            if (user.hair?.color) {
                const color = this.capitalizeFirst(user.hair.color);
                deptData.hairColors.set(color, (deptData.hairColors.get(color) || 0) + 1);
            }
            if (user.firstName && user.lastName && user.address?.postalCode) {
                const fullName = `${user.firstName}${user.lastName}`;
                deptData.addresses.set(fullName, user.address.postalCode);
            }
        }
        const result = {};
        for (const [department, data] of departmentMap) {
            result[department] = {
                male: data.males,
                female: data.females,
                ageRange: this.calculateAgeRange(data.ages),
                hair: Object.fromEntries(data.hairColors),
                addressUser: Object.fromEntries(data.addresses),
            };
        }
        return result;
    }
    calculateAgeRange(ages) {
        if (ages.length === 0)
            return "0-0";
        let min = ages[0];
        let max = ages[0];
        for (let i = 1; i < ages.length; i++) {
            if (ages[i] < min)
                min = ages[i];
            if (ages[i] > max)
                max = ages[i];
        }
        return `${min}-${max}`;
    }
    capitalizeFirst(str) {
        if (!str)
            return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}
exports.DataTransformer = DataTransformer;
//# sourceMappingURL=dataTransformer.js.map