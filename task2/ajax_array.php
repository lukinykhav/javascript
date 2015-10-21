<?php
function ajax_agents()
{
    $arr = [];
    $pdo = new PDO('mysql:host=localhost;dbname=tasks', 'root', 'audia5');
    $keyword = '%' . $_GET['keyword'] . '%';
    $sql = "SELECT * FROM language WHERE LANGUAGE LIKE (:keyword) ORDER BY language ASC LIMIT 0, 10";

    $query = $pdo->prepare($sql);
    $query->bindParam(':keyword', $keyword, PDO::PARAM_STR);
    $query->execute();

    $list = $query->fetchAll();

    foreach ($list as $word) {
        $language = $word['language'];
        array_push($arr, $language);
    }

    return json_encode($arr);
}
echo ajax_agents();