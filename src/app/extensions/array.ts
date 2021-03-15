declare interface Array<T> {
    findById(this: Array<T>, query: string): T;
    median(this: Array<T>): number;

    sortedByKey(this: Array<T>, property: string, reverse: boolean): Array<T>;
    sortByKey(this: Array<T>, property: string, reverse: boolean): Array<T>;
}

module.exports = function () {
    Array.prototype.findById = function (query) {
        for (let element of this) {
            if (element.id == query) {
                return element;
            }
        };
        return null;
    };

    Array.prototype.median = function median() {

        this.sort(function (a, b) {
            return a - b;
        });

        var half = Math.floor(this.length / 2);

        if (this.length % 2)
            return this[half];
        else
            return (this[half - 1] + this[half]) / 2.0;
    }

    Array.prototype.sortedByKey = function (property, reverse = false) {
        const sortOrder = -1;

        function lambda(a, b) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }

        const json = JSON.stringify(this);
        const output = JSON.parse(json);
        return output.sort(lambda);
    }

    Array.prototype.sortByKey = function (property, reverse = false) {
        const sortOrder = -1;

        function lambda(a, b) {
            const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }

        return this.sort(lambda);
    }
}