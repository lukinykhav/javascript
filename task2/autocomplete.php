<!DOCType html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="/task2/plugin.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="col-md-10">
    <h1>Autocomplete</h1>
</div>
<div class="col-md-6">
    <div class="input-group">
        <span class="input-group-addon">Language</span>
        <form method="GET">
            <div>
                <input type="text" class="form-control" id="language" autocomplete="off">
            </div>
        </form>
    </div>
</div>
</body>
</html>
<script>
    $("#language").autocomplete();
</script>
