<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Path to the JSON file that stores wishes
$wishesFile = __DIR__ . '/wishes.json';

// Initialize wishes file if it doesn't exist
if (!file_exists($wishesFile)) {
    file_put_contents($wishesFile, json_encode([]));
}

// Get action from request
$action = $_GET['action'] ?? ($_POST['action'] ?? null);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'get') {
    // Get all wishes
    $wishes = [];
    if (file_exists($wishesFile)) {
        $content = file_get_contents($wishesFile);
        $wishes = json_decode($content, true) ?: [];
    }
    
    echo json_encode([
        'success' => true,
        'wishes' => $wishes
    ]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'add') {
    // Add a new wish
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['wish']) || empty($input['wish']['name']) || empty($input['wish']['message'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Name and message are required'
        ]);
        http_response_code(400);
        exit;
    }
    
    // Load existing wishes
    $wishes = [];
    if (file_exists($wishesFile)) {
        $content = file_get_contents($wishesFile);
        $wishes = json_decode($content, true) ?: [];
    }
    
    // Add new wish
    $newWish = [
        'name' => htmlspecialchars(trim($input['wish']['name']), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($input['wish']['message']), ENT_QUOTES, 'UTF-8'),
        'date' => $input['wish']['date'] ?? date('c')
    ];
    
    $wishes[] = $newWish;
    
    // Save wishes
    if (file_put_contents($wishesFile, json_encode($wishes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode([
            'success' => true,
            'message' => 'Wish added successfully'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to save wish'
        ]);
        http_response_code(500);
    }
    
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid request'
    ]);
    http_response_code(400);
}
?>

