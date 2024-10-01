<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/meters_to_feet', function (Request $request) {
    $meters = $request->input('meters');
    
    if (!is_numeric($meters)) {
        return response()->json(['error' => 'Invalid input'], 400);
    }
    
    $feet = mt_to_ft((int) $meters);
    return $feet;
  });

 
function mt_to_ft(int $meters){
    return $meters * 3.281;
}

Route::get('/secure_password', function (Request $request) {
    $password = $request->input('password');
    if (strlen($password) < 8) {
        return response()->json(['error'], 400);
    }
    if (!preg_match('/[a-z]/', $password)) {
        return response()->json(['error'], 400);
    }
    if (!preg_match('/[A-Z]/', $password)) {
        return response()->json(['error'], 400);
    }
    if (!preg_match('/[0-9]/', $password)) {
        return response()->json(['error'], 400);
    }

    return response()->json(['success' => 'The password is secure.'], 200);
});

Route::post('/even_and_odd_numbers', function(Request $request){
    $number = $request -> input('number');
    if(!is_numeric($number) || $number<=0){
        return response()->json(['Error'],400);
    }
    $digits = str_split((string)$number);
    $evenCount = 0;
    $oddCount = 0;

    foreach ($digits as $digit) {
        if ($digit % 2 === 0) {
            $evenCount++;
        } else {
            $oddCount++;
        }
    }
    return response()->json([
        'even' => $evenCount,
        'odd' => $oddCount
    ], 200);
});
