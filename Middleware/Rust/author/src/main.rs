#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use iota_streams::{app_channels::api::tangle::{Author}};
use iota_lib_rs::prelude::iota_client;
use iota_streams::app::transport::tangle::client::SendTrytesOptions;
mod api_author;
use crate::api_author::announce::start_a_new_channel;
//use crate::api_author::send_message::send_signed_message;
fn main() {
    //println!("Hello, world!");
    let mut client = iota_client::Client::new("https://nodes.devnet.iota.org:443");

let mut send_opt = SendTrytesOptions::default();
send_opt.min_weight_magnitude = 9;
send_opt.local_pow = false;
let mut author = Author::new("MYAUTHORSECRETSTRING", 3, true);
let channel_address = author.channel_address().to_string();
// let announce_message = start_a_new_channel(&mut author, &mut client, send_opt).unwrap();

// let public_payload = "BREAKINGCHANGES";

//let signed_message = send_signed_message(&mut author, &channel_address, &announce_message.msgid.to_string(), &public_payload.to_string(), &mut client, send_opt).unwrap();

println!("");
println!("Stream Channel Published at below address\n {}", channel_address);
println!("");
}
