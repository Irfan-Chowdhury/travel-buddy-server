<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Relations\HasMany;
// use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'role',
        'avatar_url', 'cover_url', 'location', 'age',
        'bio', 'rating_avg', 'rating_count'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile(){
        // return $this->hasOne(UserProfile::class);
    }

    public function interests() {
        // return $this->hasMany(UserInterest::class);
    }

    public function travelPlans() {
        // return $this->hasMany(TravelPlan::class);
    }

    public function bookings() {
        // return $this->hasMany(PlanBooking::class);
    }

    public function payments() {
        // return $this->hasMany(Payment::class);
    }
}
