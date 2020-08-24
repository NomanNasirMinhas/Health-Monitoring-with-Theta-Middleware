use failure::Fallible;
use iota_streams::app_channels::api::tangle::{Address, Author, Transport};

pub fn start_a_new_channel<T: Transport>(
    author: &mut Author,
    client: &mut T,
    send_opt: T::SendOptions,
) -> Fallible<Address> {
    //this function takes a generic type
    //that implements the Transport trait for sending and receiving messages on a communication channel.

    let announcement = author.announce()?;
    client.send_message_with_options(&announcement, send_opt)?;
    println!("Channel published");
    Ok(announcement.link)
}
