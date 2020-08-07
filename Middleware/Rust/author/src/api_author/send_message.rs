use iota_streams::app_channels::api::tangle::{Author, Address, Transport};
use iota_streams::protobuf3::types::Trytes;
use iota_streams::core::tbits::Tbits;
use std::str::FromStr;
use failure::{Fallible, bail};

pub fn send_signed_message<T: Transport>(author: &mut Author, channel_address: &String, announce_message_identifier: &String, public_payload: &String, client: &mut T, send_opt: T::SendOptions ) -> Fallible<Address> {
//this method takes a public payload to publish on the channel, 
//and the message identifier of the Announce message to link to.

let public_payload = Trytes(Tbits::from_str(&public_payload).unwrap());
let announcement_link = match Address::from_str(&channel_address, &announce_message_identifier){
    Ok(announcement_link) => announcement_link,
    Err(()) => bail!("Failed to create Address from {}:{}", &channel_address, &announce_message_identifier),
};
let empty_masked_payload = Trytes(Tbits::from_str("").unwrap());
let message = author.sign_packet(&announcement_link, &public_payload, &empty_masked_payload)?;
println!("Sending signed message");
client.send_message_with_options(&message, send_opt)?;
println!("Published signed message");
Ok(message.link)
}