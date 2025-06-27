<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$apiKey = "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";
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input["prompt"])) {
    $prompt = $input["prompt"];
} else {
    $prompt = "Hello";
}

if (isset($input["history"])) {
    $conversationHistory = $input["history"];
} else {
    $conversationHistory = [];
}

$conversationHistory[] = ["role" => "user", "content" => $prompt];

$body = [
    "model" => "llama3-8b-8192",
    "messages" => $conversationHistory,
    "temperature" => 0.7
];

$ch = curl_init("https://api.groq.com/openai/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
$response = curl_exec($ch);

if (!$response) {
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$responseData = json_decode($response, true);

if (isset($responseData['choices'][0]['message']['content'])) {
    $conversationHistory[] = ["role" => "assistant", "content" => $responseData['choices'][0]['message']['content']];
    echo json_encode(["choices" => [["message" => $responseData['choices'][0]['message']]]]);
} else {
    echo json_encode(["error" => "Invalid response from API"]);
}