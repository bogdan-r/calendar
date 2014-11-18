 App.Util.splitApart = function(input, countSplitPart){

    function toClass(data) {
        return {}.toString.call(data).slice(8, -1);
    }

    function splitData(countToSplit, arrData) {
        var arr = [];
        var counter = 0;
        for(var i = 0; i < arrData.length; i++){
            if (i % countToSplit === 0) {
                arr.push([]);
            }
            arr[counter].push(arrData[i]);
            if ((i + 1) % countToSplit === 0) {
                counter++;
            }
        }
        return arr;
    }

    if (!countSplitPart) {
        return input;
    }
    if (typeof countSplitPart === "number") {
        return splitData(countSplitPart, input);
    }
    if (toClass(countSplitPart) === "Array") {
        var intermArr = input;
        for(var i = countSplitPart.length; i > 0; i--){
            intermArr = splitData(countSplitPart[i - 1], intermArr);
        }
        return intermArr;
    }
}