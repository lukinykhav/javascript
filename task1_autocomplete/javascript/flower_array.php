<?php
function ajax_agents()
{
    $arr = [];
    $pdo = new PDO('mysql:host=localhost;dbname=tasks', 'root', 'audia5');
    $keyword = '%' . $_GET['keyword'] . '%';
    $sql = "SELECT * FROM flowers WHERE flower LIKE (:keyword) ORDER BY flower ASC LIMIT 0, 10";

    $query = $pdo->prepare($sql);
    $query->bindParam(':keyword', $keyword, PDO::PARAM_STR);
    $query->execute();

    $list = $query->fetchAll();

    foreach ($list as $word) {
        $flower = $word['flower'];
        array_push($arr, $flower);
    }

    return json_encode($arr);
}
echo ajax_agents();