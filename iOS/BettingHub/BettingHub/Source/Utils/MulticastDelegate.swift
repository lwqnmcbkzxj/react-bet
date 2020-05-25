//
//  MulticastDelegate.swift
//  ABChess
//
//  Created by Maxim Bezdenezhnykh on 31.03.2020.
//  Copyright © 2020 Максим Шалашников. All rights reserved.
//

import Foundation

class MulticastDelegate <T> {
  private let delegates: NSHashTable<AnyObject> = NSHashTable.weakObjects()

  func add(delegate: T) {
    delegates.add(delegate as AnyObject)
  }

  func remove(delegate: T) {
    for oneDelegate in delegates.allObjects.reversed() {
      if oneDelegate === delegate as AnyObject {
        delegates.remove(oneDelegate)
      }
    }
  }

  func invoke(invocation: (T) -> ()) {
    for delegate in delegates.allObjects.reversed() {
      invocation(delegate as! T)
    }
  }
}
