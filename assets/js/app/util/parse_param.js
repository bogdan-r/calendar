App.Util.parse_param = function($inputs){

    var outputParams = {}

    $inputs.each(function(){
        var name = $(this).attr('name');
        var value = $(this).val();
        outputParams[name] = value;
    });
    return outputParams
}
