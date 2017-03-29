# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170329011647) do

  create_table "course_segments", force: :cascade do |t|
    t.integer  "course_id"
    t.integer  "event_id"
    t.integer  "order_num"
    t.text     "gps_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", force: :cascade do |t|
    t.integer  "host_id"
    t.integer  "event_id"
    t.text     "gps_data"
    t.string   "gps_file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "host_id"
    t.integer  "course_id"
    t.float    "distance"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.float    "entry_fee"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "eventType"
    t.string   "title"
  end

  create_table "hosts", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "motto"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "contact_name"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
