#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]

use iota_streams::{
    app_channels::api::tangle::{Author}
};
use iota_lib_rs::prelude::iota_client;
use iota_streams::app::transport::tangle::client::SendTrytesOptions;
mod api_author;
use crate::api_author::announce::start_a_new_channel;
use crate::api_author::send_message::send_signed_message;
use crate::api_author::get_subscribers::get_subscriptions_and_share_keyload;
use crate::api_author::send_masked_payload::send_masked_payload;


fn main() {

    //  -------- IOTA network settings ---------

    // Connect to an IOTA node
    let mut client = iota_client::Client::new("https://nodes.devnet.iota.org:443");

    // Change the default settings to use a lower minimum weight magnitude for the Devnet
    let mut send_opt = SendTrytesOptions::default();
    // default is 14
    send_opt.min_weight_magnitude = 9;
    send_opt.local_pow = false;

    // --------------- Author -------------------

    // Create a new channel
    // REPLACE THE SECRET WITH YOUR OWN
    let mut author = Author::new("thetamiddlewaresecretseed", 3, true);

    let channel_address = author.channel_address().to_string();
    
    // Send the `Announce` message
    let announce_message = start_a_new_channel(&mut author, &mut client, send_opt).unwrap();
  
    let public_payload = "BREAKINGCHANGES";

    let signed_message = send_signed_message(&mut author, &channel_address, &announce_message.msgid.to_string(), &public_payload.to_string(), &mut client, send_opt).unwrap();

    println!("");
    println!("Now, in a new terminal window, use the subscriber to publish a `Subscribe` message on the channel");
    println!("");
    println!("cargo run --release --bin subscriber {} {} {}", channel_address, announce_message.msgid, signed_message.msgid);
    println!("");

    let mut subscribe_message_identifier = String::new();
    println!("Enter the message identifier of the `Subscribe` message that was published by the subscriber:");
    std::io::stdin().read_line(&mut subscribe_message_identifier).unwrap();

    if subscribe_message_identifier.ends_with('\n') {
        subscribe_message_identifier.pop();
    }
    if subscribe_message_identifier.ends_with('\r') {
        subscribe_message_identifier.pop();
    }

    let recv_opt = ();
    let keyload_message = get_subscriptions_and_share_keyload(&mut author, &channel_address, &mut subscribe_message_identifier, &mut client, send_opt, recv_opt).unwrap();

    println!("Paste this `Keyload` message identifier in the subscriber's command prompt: {}", keyload_message.msgid);

    let masked_payload = "SUPERSECRETPAYLOAD";

    let signed_private_message = send_masked_payload(&mut author, &channel_address, &keyload_message.msgid.to_string(), &public_payload.to_string(), &masked_payload.to_string(), &mut client, send_opt).unwrap();

    println!("Paste this `SignedPacket` message identifier in the subscriber's command prompt: {}", signed_private_message.msgid);

}