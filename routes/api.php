<?php

use App\Http\Controllers\Client\DestinationController;
use App\Http\Controllers\Client\TravelerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */
    // Route::prefix('auth')->group(function () {
    //     Route::post('register', [AuthController::class, 'register']);
    //     Route::post('login',    [AuthController::class, 'login']);

    //     Route::middleware('auth:sanctum')->group(function () {
    //         Route::post('logout', [AuthController::class, 'logout']);
    //         Route::get('me',      [AuthController::class, 'me']);
    //     });
    // });


     /*
    |--------------------------------------------------------------------------
    | PUBLIC RESOURCES
    |--------------------------------------------------------------------------
    */
    Route::get('destinations/popular', [DestinationController::class, 'popular']);
    Route::get('travelers/top-rated', [TravelerController::class, 'topRated']);

    // Route::get('interests', [InterestController::class, 'index']);
    // Route::get('users',     [UserController::class, 'index']);
    // Route::get('users/{id}',[UserController::class, 'show']);

    // Route::get('plans',               [TravelPlanController::class, 'index']);
    // Route::get('plans/{id}',          [TravelPlanController::class, 'show']);
    // Route::get('search/travelers',    [SearchController::class, 'travelers']);
    // Route::get('search/plans',        [SearchController::class, 'plans']);
    // Route::get('search/match/{uid}',  [SearchController::class, 'match']);


    /*
    |--------------------------------------------------------------------------
    | AUTHENTICATED ROUTES
    |--------------------------------------------------------------------------
    */
    // Route::middleware('auth:sanctum')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | USERS
        |--------------------------------------------------------------------------
        */
        // Route::put('users/{id}',      [UserController::class, 'update']);
        // Route::delete('users/{id}',   [UserController::class, 'destroy']);

        // Profiles
        // Route::get('profiles/{uid}',  [UserProfileController::class, 'show']);
        // Route::put('profiles/{uid}',  [UserProfileController::class, 'update']);

        // User Interests
        // Route::get('users/{id}/interests', [UserInterestController::class, 'userInterests']);
        // Route::post('users/{id}/interests',[UserInterestController::class, 'store']);
        // Route::delete('users/{id}/interests/{int}',
        //     [UserInterestController::class, 'destroy']
        // );


        /*
        |--------------------------------------------------------------------------
        | TRAVEL PLANS
        |--------------------------------------------------------------------------
        */
        // Route::post('plans',          [TravelPlanController::class, 'store']);
        // Route::put('plans/{id}',      [TravelPlanController::class, 'update']);
        // Route::delete('plans/{id}',   [TravelPlanController::class, 'destroy']);

        // // Plan interests
        // Route::get('plans/{id}/interests',
        //     [PlanInterestController::class, 'index']
        // );
        // Route::post('plans/{id}/interests',
        //     [PlanInterestController::class, 'store']
        // );
        // Route::delete('plans/{id}/interests/{interest_id}',
        //     [PlanInterestController::class, 'destroy']
        // );


        /*
        |--------------------------------------------------------------------------
        | PARTICIPANTS
        |--------------------------------------------------------------------------
        */
        // Route::get('plans/{id}/participants',
        //     [ParticipantController::class, 'index']
        // );
        // Route::post('plans/{id}/participants',
        //     [ParticipantController::class, 'store']
        // );
        // Route::put('plans/{id}/participants/{uid}',
        //     [ParticipantController::class, 'update']
        // );
        // Route::delete('plans/{id}/participants/{uid}',
        //     [ParticipantController::class, 'destroy']
        // );


        /*
        |--------------------------------------------------------------------------
        | JOIN REQUESTS
        |--------------------------------------------------------------------------
        */
        // Route::post('plans/{id}/join',
        //     [JoinRequestController::class, 'store']
        // );

        // Route::get('plans/{id}/join-requests',
        //     [JoinRequestController::class, 'planRequests']
        // );

        // Route::put('join-requests/{req_id}/approve',
        //     [JoinRequestController::class, 'approve']
        // );

        // Route::put('join-requests/{req_id}/reject',
        //     [JoinRequestController::class, 'reject']
        // );

        // Route::delete('join-requests/{req_id}',
        //     [JoinRequestController::class, 'destroy']
        // );


        /*
        |--------------------------------------------------------------------------
        | REVIEWS
        |--------------------------------------------------------------------------
        */
        // Route::get('users/{id}/reviews',
        //     [ReviewController::class, 'userReviews']
        // );
        // Route::post('reviews',        [ReviewController::class, 'store']);
        // Route::get('reviews/{id}',    [ReviewController::class, 'show']);
        // Route::put('reviews/{id}',    [ReviewController::class, 'update']);
        // Route::delete('reviews/{id}', [ReviewController::class, 'destroy']);


        /*
        |--------------------------------------------------------------------------
        | NOTIFICATIONS
        |--------------------------------------------------------------------------
        */
        // Route::get('notifications',      [NotificationController::class, 'index']);
        // Route::put('notifications/{id}/read',
        //     [NotificationController::class, 'markRead']
        // );
        // Route::delete('notifications/{id}',
        //     [NotificationController::class, 'destroy']
        // );


        /*
        |--------------------------------------------------------------------------
        | BOOKINGS & PAYMENTS
        |--------------------------------------------------------------------------
        */
        // Bookings
        // Route::post('plans/{id}/book',         [BookingController::class, 'store']);
        // Route::get('plans/{id}/bookings',      [BookingController::class, 'planBookings']);
        // Route::get('bookings/{id}',            [BookingController::class, 'show']);
        // Route::put('bookings/{id}',            [BookingController::class, 'update']);
        // Route::delete('bookings/{id}',         [BookingController::class, 'destroy']);

        // // Payments
        // Route::post('payments/initiate',       [PaymentController::class, 'initiate']);
        // Route::post('payments/confirm',        [PaymentController::class, 'confirm']);
        // Route::get('payments/{id}',            [PaymentController::class, 'show']);
        // Route::get('users/{id}/payments',      [PaymentController::class, 'userPayments']);
    // });


    /*
    |--------------------------------------------------------------------------
    | PAYMENT WEBHOOK (No Auth)
    |--------------------------------------------------------------------------
    */
    // Route::post('v1/payments/webhook', [PaymentWebhookController::class, 'handle']);


    /*
    |--------------------------------------------------------------------------
    | USER DASHBOARD (auth)
    |--------------------------------------------------------------------------
    */
    // Route::middleware('auth:sanctum')->group(function () {
    //     Route::prefix('dashboard')->group(function () {
    //         Route::get('overview',       [DashboardController::class, 'overview']);
    //         Route::get('trips',          [DashboardController::class, 'trips']);
    //         Route::get('matches',        [DashboardController::class, 'matches']);
    //         Route::get('notifications',  [DashboardController::class, 'notifications']);
    //         Route::get('payments',       [DashboardController::class, 'payments']);
    //     });
    // });


    /*
    |--------------------------------------------------------------------------
    | ADMIN PANEL (Admin Middleware)
    |--------------------------------------------------------------------------
    */
    // Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    //     // Users
    //     Route::get('users',                [AdminUserController::class, 'index']);
    //     Route::put('users/{id}/ban',       [AdminUserController::class, 'ban']);
    //     Route::put('users/{id}/unban',     [AdminUserController::class, 'unban']);

    //     // Plans
    //     Route::get('plans',                [AdminPlanController::class, 'index']);
    //     Route::put('plans/{id}/approve',   [AdminPlanController::class, 'approve']);
    //     Route::put('plans/{id}/reject',    [AdminPlanController::class, 'reject']);
    //     Route::delete('plans/{id}',        [AdminPlanController::class, 'destroy']);

    //     // Reviews
    //     Route::get('reviews',              [AdminReviewController::class, 'index']);
    //     Route::delete('reviews/{id}',      [AdminReviewController::class, 'destroy']);

    //     // Stats
    //     Route::get('stats',                [AdminStatsController::class, 'stats']);
    // });
