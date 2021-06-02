<?php

class Data {

    protected function dbConnect() {
        try
        {
            $db = new PDO('mysql:host=localhost;dbname=dev;charset=utf8', 'root', '');
            return $db;
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
    }

    public function connectLogin(){
        $db = $this->dbConnect();
        $req = $db->prepare("SELECT * from user WHERE email=:email ");
        
        $req->execute(array(
            ":email" => $_POST['user'],
        ));
    
        $res = $req->fetch();
        $id = $res["id"];
        $hash = $res['password'];
        $email = $res['email'];
        if (($_POST["user"] == $email) AND (password_verify($_POST["password"], $hash))) {
            $data = array();

            $data['id'] = $id;
            $data['name'] = $res['name'];
            $data['img'] = $res['img'];
            $data['check'] = '0';

            echo json_encode($data);

            header("Content-Type: application/json");
            header("Access-Control-Allow-Headers: Content-Type, x-requested-with");
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
        }else{
            $data = array();

            $data['check'] = '1';

            echo json_encode($data);

            header("Content-Type: application/json");
            header("Access-Control-Allow-Headers: Content-Type, x-requested-with");
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
        }
    }
}

$data = new Data;
$data->connectLogin();

?>