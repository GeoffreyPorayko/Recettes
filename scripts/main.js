let units = [];
let types = [];
let ingredients = [];
let recettes = [];
$(function(){
    console.log("ok")
    getIngredients();
    getType();

    changeCard("/plannings.html")

    $('body').on('click', 'a', function(){
        if($(this).data('include') != undefined){
            changeCard($(this).data('include'));
        }
    })

    $('#ingredientModal').on('shown.bs.modal', () => {
        let selectType = $('#select-category')
        selectType.empty();
       types.forEach((type) => {
           selectType.append('<option>'+type+'</option>');
       })
    })

    $('#btn-add-ingredient').on('click', function(){
        let nom = ($('#ingredient-nom').val()).toLowerCase();
        let category = $('#select-category').val();
        let control = true;
        $('.invalid-feedback').hide();

        if(nom == ""){
            control = false;
            $('#empty-name').show();
        } else if(ingredients.find(element => element.nom == nom)) {
            control = false;
            $('#existing-name').show();
        } else {
            ingredients.push({'nom': nom, 'type': category});
            var f = "sometextfile.txt";

            var txtFile =new File(f);
            txtFile.writeln('test');
            txtFile.close();
        }

        if(!control)
            $('#ingredient-nom').addClass('is-invalid');

    })
});

function changeCard(link){
    $('#container').empty();
    $.get(link, function(contentHtml){
        $('#container').html(contentHtml);
    })
}

function getIngredients(){
    $.get('/data/ingredients.json', function(json){
        ingredients = json;
    })
}

function getType(){
    $.get('/data/type.json', function(json){
        types = json;
    })
}