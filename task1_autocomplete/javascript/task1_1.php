<!DOCType html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/autocomplete.js"></script>
</head>
<body>
<div class="col-md-10">
    <h1>Autocomplete</h1>
</div>
<div class="col-md-6">
    <div class="input-group">
        <span class="input-group-addon">Language</span>
        <form method="GET" id="list">
            <input type="text" class="form-control" id="language" autocomplete="off">
        </form>
    </div>
</div>
<script>
    var autocomplete = new Autocomplete({
        el: document.getElementById('language'),
        url: "/task1_autocomplete/javascript/ajax_array.php/ajax_agents",
    });

</script>
</body>
</html>
